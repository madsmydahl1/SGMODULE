function onResponse(req, res) {
    try {
        var data = JSON.parse(res.body);
        if (data && data.data && data.data.entitlements) {
            // Simulate an entitlement
            data.data.entitlements = [{"id": "premium_access", "valid": true}];
            data.data.is_whitelist = 1; // Assuming '1' means whitelisted for premium features
            res.body = JSON.stringify(data);
        }
    } catch (e) {
        console.log("Failed to modify the response: " + e.message);
    }
    return res;
}

// Register the handler
$done(onResponse);