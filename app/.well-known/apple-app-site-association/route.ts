export const dynamic = "force-dynamic";

export function GET() {
  const appId = process.env.QUESTCLUB_IOS_APP_ID;

  return Response.json(
    {
      applinks: {
        apps: [],
        details: appId
          ? [
              {
                appID: appId,
                paths: ["/join/*"],
                components: [
                  {
                    "/": "/join/*",
                    comment: "Quest Club group invite links",
                  },
                ],
              },
            ]
          : [],
      },
    },
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=3600",
      },
    }
  );
}
