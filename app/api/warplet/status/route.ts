import { NextResponse } from "next/server";
import { getWarpletTransform } from "@/lib/transform-store";
import { getMintStatus } from "@/lib/mint-status";

export const runtime = "nodejs";

function parseFid(url: string) {
  const { searchParams } = new URL(url);
  const fidParam = searchParams.get("fid");
  if (!fidParam) throw new Error("fid query param is required");
  const fid = Number(fidParam);
  if (!Number.isInteger(fid) || fid <= 0) {
    throw new Error("fid must be a positive integer");
  }
  return fid;
}

export async function GET(req: Request) {
  try {
    const fid = parseFid(req.url);
    const [transform, mint] = await Promise.all([
      getWarpletTransform(fid),
      getMintStatus(fid),
    ]);
    console.log("[api/warplet/status]", {
      fid,
      hasTransform: Boolean(transform),
      hasMinted: mint.hasMinted,
      owner: mint.owner,
    });

    return NextResponse.json(
      {
        fid,
        hasTransformed: Boolean(transform),
        transform: transform
          ? {
              cid: transform.cid,
              gatewayUrl: transform.gatewayUrl,
              imageUrl: transform.imageUrl,
              createdAt: transform.createdAt,
            }
          : null,
        hasMinted: mint.hasMinted,
        owner: mint.owner,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch Warplet status";
    const status =
      message.includes("fid") || message.includes("required") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

