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

  const { type, summary, description, userEmail, priority, project } = requestBody;

  if (userEmail && project?.id) {
    const body = {
      serviceDeskId: project.id,
      requestTypeId: type,
      requestFieldValues: {
        summary: summary || global.REQUEST_TYPES[2].title,
        description: description || "",
        customfield_10244: userEmail,
        priority: priority,
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
      //return response
      if (!response.ok) {
        throw new Error(`${errors.JIRA_ERROR_RESPONSE} ${response.statusText}`);
      }

      const data = await response.json();
      // return response;
      // return data;
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
  const userEmails = url.searchParams.get("userEmail");
  const project = url.searchParams.get("project");
  const fields = url.searchParams.get("fields") ? url.searchParams.get("fields") : 'summary,description,issuetype,created,customfield_10244,priority,updated,timetracking,status,resolutiondate'; 
  let queryUrl = `https://ontron.atlassian.net/rest/api/3/search?jql=project=${project}`

  if (userEmails && userEmails?.length > 0) {
    const emailQueries = `"Submitter Name[Short text]" ~ "${userEmails}"`
     
    queryUrl += ` AND (${emailQueries})&fields=${fields}&expand=changelog`;
  }
    queryUrl += `&fields=${fields}&expand=changelog`;
  

     try {
      const response = await fetch(queryUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
          "Cache-Control": "no-cache", 
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
