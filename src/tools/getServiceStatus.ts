export function getServiceStatus() {

    // Create simulated service status
    const apiStatus = "ok";
    const webhookStatus = "degraded";
    const dashboardStatus = "down";
    // Return simulated service status
    return {
        "api": apiStatus,
        "webhook": webhookStatus,
        "dashboard": dashboardStatus
    }
}