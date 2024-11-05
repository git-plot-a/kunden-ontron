import global from "@/app/constants/global";
import errors from "@/app/constants/errors";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const headers = req.headers;

  // Проверяем, что запрос сделан через fetch или XMLHttpRequest
  const isFetchRequest =
    headers.get("x-requested-with") === "XMLHttpRequest" ||
    headers.get("content-type") === "application/json";

  if (!isFetchRequest) {
    return NextResponse.json(
      { message: errors.JIRA_ERROR_FORBIDDEN },
      { status: 403 }
    );
  }

  const jiraUrl = global.JIRA_URL;
  const auth = `Basic ${btoa(`${global.JIRA_USER}:${global.JIRA_TOCKEN}`)}`;

  const requestBody = await req.json();

  const { type, summary, description, userEmail } = requestBody;

  if (userEmail) {
    const body = {
      serviceDeskId: "2",
      requestTypeId: type,
      requestFieldValues: {
        summary: summary || global.REQUEST_TYPES[2].title,
        description: description || "",
        customfield_10244: userEmail,
      },
    };

    try {
      const response = await fetch(jiraUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`${errors.JIRA_ERROR_RESPONSE} ${response.statusText}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        { message: errors.JIRA_ERROR_MISTAKE + error },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: Request) {
  // const headers = req.headers;
  const auth = `Basic ${btoa(`${global.JIRA_USER}:${global.JIRA_TOCKEN}`)}`;

  const url = new URL(req.url);
  const userEmail = url.searchParams.get("userEmail");

  // const isFetchRequest =
  //   headers.get("x-requested-with") === "XMLHttpRequest" ||
  //   headers.get("content-type") === "application/json";

  // if (!isFetchRequest) {
  //   return NextResponse.json(
  //     { message: errors.JIRA_ERROR_FORBIDDEN },
  //     { status: 403 }
  //   );
  // }

  // if (!userEmail) {
  //   return NextResponse.json(
  //     { message: "userEmail is required" },
  //     { status: 400 }
  //   );
  // }

  const queryUrl = `https://ontron.atlassian.net/rest/api/3/search?jql=project=OIT%20AND%20%22Submitter%20Name%5BShort%20text%5D%22%20~%20%22${encodeURIComponent(
    (userEmail as string)
  )}%22&fields=summary,description,issuetype,created,customfield_10244,priority,updated,timetracking,status,resolutiondate&expand=changelog`;

  // return {ok: true, url: queryUrl }
  try {
    const response = await fetch(queryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });

    if (!response.ok) {
      throw new Error(`${errors.JIRA_ERROR_RESPONSE} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: errors.JIRA_ERROR_MISTAKE + error },
      { status: 500 }
    );
  }
}
