import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type ScenarioResponse =
  | {
      matched: true;
      scenario: {
        slug: string;
        title: string;
        iconKey: string;
        questions: Array<{
          id: string;
          text: string;
          options: Array<{ label: string; value: number }>;
        }>;
      };
    }
  | { matched: false };

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dish = normalize(url.searchParams.get("dish") ?? "");

  if (!dish) {
    return NextResponse.json<ScenarioResponse>({ matched: false });
  }

  const scenarios = await prisma.scenario.findMany({
    select: {
      slug: true,
      title: true,
      iconKey: true,
      keywords: { select: { value: true } },
      questions: {
        orderBy: { order: "asc" },
        select: {
          key: true,
          text: true,
          options: {
            orderBy: { order: "asc" },
            select: { label: true, value: true },
          },
        },
      },
    },
  });

  const matched = scenarios.find((s) =>
    s.keywords.some((k) => dish.includes(normalize(k.value)))
  );

  if (!matched) {
    return NextResponse.json<ScenarioResponse>({ matched: false });
  }

  return NextResponse.json<ScenarioResponse>({
    matched: true,
    scenario: {
      slug: matched.slug,
      title: matched.title,
      iconKey: matched.iconKey,
      questions: matched.questions.map((q) => ({
        id: q.key,
        text: q.text,
        options: q.options,
      })),
    },
  });
}
