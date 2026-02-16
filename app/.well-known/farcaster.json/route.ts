/* import { withValidManifest } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../../../minikit.config";

export async function GET() {
  return Response.json(withValidManifest(minikitConfig));
} */

  export async function GET() {
    const URL = process.env.NEXT_PUBLIC_URL;
  
    return Response.json({
      accountAssociation: {
        "header": "eyJmaWQiOjIwNzAxLCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4N2VFMEI2RWUwRUFjMzUxNzBGMzgxNjFiMTNjZGYxNjY5ZWE0ZTUzZSJ9",
        "payload": "eyJkb21haW4iOiJjcm9jaGV0d2FycGxldHMubWluaWFwcHMuem9uZSJ9",
        "signature": "kQZjU9zF1VFCiZJXzYB03wupuctMhG4bXQJ7ZcUQyHJYMUU0aCm0eW3Yux9wkXZYSurLdRwcsPNVJC8Hjj/ZBhw=",
      },
      baseBuilder: {
        ownerAddress: "0x58F521068A39a5e675ACc7Edd7E269f576867691",
      },
      miniapp: {
        version: "1",
        name: "Crochet Warplets",
        subtitle: "Your Warplet in Crochet",
        description: "Transform your Warplet into an adorable Crochet Warplet",
        iconUrl: `${URL}/icon.png`,
        splashImageUrl: `${URL}/splashnt.png`,
        splashBackgroundColor: "#6A3CFF",
        homeUrl: URL,
        webhookUrl: `https://api.neynar.com/f/app/f93e2ac5-db70-4d0a-b69b-8a25fc81c573/event`,
        primaryCategory: "social",
        tags: [`warplet`, `pfp`, `farcaster`, `crochet`, `amigurumi`],
        screenshotUrls: [
          `${URL}/ss_01.jpg`,
          `${URL}/ss_02.jpg`
     ],
        heroImageUrl: `${URL}/heroRectangle.png`,
        tagline: "Warplet to Crochet",
        ogTitle: "Crochet Warplets",
        ogDescription: "Transform your Warplet into an adorable Crochet Warplet",
        ogImageUrl: `${URL}/hero.png`,
      },
    });
  }