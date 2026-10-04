import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { createGa4AdminClient } from "@/server/lib/ga4Client";
import { Ga4ReportError } from "@/server/lib/ga4Errors";
import { mapGa4ReportError } from "@/server/features/ga4/services/Ga4ReportingService";

async function getMeasurementHealth(projectId: string) {
  const connection = await Ga4ConnectionRepository.getByProjectId(projectId);
  if (!connection) {
    throw new Ga4ReportError(
      "ga4_not_connected",
      "Google Analytics is not connected for this project.",
    );
  }
  const client = createGa4AdminClient({
    userId: connection.connectedByUserId,
    ga4AccountId: connection.ga4AccountId,
  });
  try {
    const streamList = await client.listDataStreams(connection.propertyId);
    const streams = streamList.items;
    const webStreams = [];
    for (const stream of streams) {
      if (stream.type !== "WEB_DATA_STREAM") continue;
      const enhancedMeasurement = await client.getEnhancedMeasurementSettings(
        stream.name,
      );
      webStreams.push({
        streamId: stream.name.split("/").at(-1) ?? stream.name,
        displayName: stream.displayName,
        measurementId: stream.webStreamData?.measurementId ?? null,
        defaultUri: stream.webStreamData?.defaultUri ?? null,
        createTime: stream.createTime ?? null,
        updateTime: stream.updateTime ?? null,
        enhancedMeasurement,
      });
    }
    const [keyEventList, dimensionList, metricList] = await Promise.all([
      client.listKeyEvents(connection.propertyId),
      client.listCustomDimensions(connection.propertyId),
      client.listCustomMetrics(connection.propertyId),
    ]);
    const keyEvents = keyEventList.items;
    const customDimensions = dimensionList.items;
    const customMetrics = metricList.items;
    // Lists are capped by a request budget; name every one that was cut short
    // so a partial page is never read as the whole inventory.
    const incompleteLists = [
      ...(streamList.complete ? [] : ["data_streams"]),
      ...(keyEventList.complete ? [] : ["key_events"]),
      ...(dimensionList.complete ? [] : ["custom_dimensions"]),
      ...(metricList.complete ? [] : ["custom_metrics"]),
    ];
    const issues: string[] = [];
    // An empty or missing item in a truncated list proves nothing.
    if (webStreams.length === 0 && streamList.complete) {
      issues.push("no_web_stream");
    }
    if (
      webStreams.length > 0 &&
      webStreams.every((stream) => !stream.enhancedMeasurement.streamEnabled)
    ) {
      issues.push("enhanced_measurement_disabled");
    }
    if (
      webStreams.length > 0 &&
      webStreams.every(
        (stream) =>
          !stream.enhancedMeasurement.streamEnabled ||
          !stream.enhancedMeasurement.siteSearchEnabled,
      )
    ) {
      issues.push("site_search_measurement_disabled");
    }
    if (keyEvents.length === 0 && keyEventList.complete) {
      issues.push("no_key_events_configured");
    }
    if (incompleteLists.length > 0) issues.push("inventory_incomplete");

    return {
      status: "ok" as const,
      source: {
        provider: "google_analytics_admin" as const,
        propertyId: connection.propertyId,
        propertyDisplayName: connection.propertyDisplayName,
      },
      summary: {
        dataStreamCount: streams.length,
        webStreamCount: webStreams.length,
        keyEventCount: keyEvents.length,
        customDimensionCount: customDimensions.length,
        customMetricCount: customMetrics.length,
        issueCount: issues.length,
      },
      issues,
      incompleteLists,
      webStreams,
      otherStreams: streams
        .filter((stream) => stream.type !== "WEB_DATA_STREAM")
        .map((stream) => ({
          streamId: stream.name.split("/").at(-1) ?? stream.name,
          type: stream.type,
          displayName: stream.displayName,
        })),
      keyEvents,
      customDefinitions: {
        dimensions: customDimensions,
        metrics: customMetrics,
      },
    };
  } catch (error) {
    mapGa4ReportError(error);
  }
}

export const Ga4MeasurementHealthService = { getMeasurementHealth };
