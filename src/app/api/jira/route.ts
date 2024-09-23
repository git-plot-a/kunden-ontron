import global from '@/app/constants/global';
import errors from '@/app/constants/errors';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const headers = req.headers;

  // Проверяем, что запрос сделан через fetch или XMLHttpRequest
  const isFetchRequest =
    headers.get('x-requested-with') === 'XMLHttpRequest' || headers.get('content-type') === 'application/json';

  if (!isFetchRequest) {
    return NextResponse.json({ message: errors.JIRA_ERROR_FORBIDDEN }, { status: 403 });
  }

  const jiraUrl = global.JIRA_URL
  const auth = `Basic ${btoa(`${global.JIRA_USER}:${global.JIRA_TOCKEN}`)}`; 

  const requestBody = await req.json(); 

  const { type, summary, description, userEmail } = requestBody;

  const body = {
    serviceDeskId: "2",
    requestTypeId: type,
    requestFieldValues: {
      summary: summary || "Default Summary",
      description: description || "Default Description",
      customfield_10244: userEmail || "defaultemail@domain.com",
    },
  };

  try {
    const response = await fetch(jiraUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`${errors.JIRA_ERROR_RESPONSE} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: errors.JIRA_ERROR_MISTAKE + error }, { status: 500 });
  }
}