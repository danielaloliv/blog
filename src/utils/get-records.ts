
import { airtable } from "./airtable";

export async function getRecords() {
  const base = airtable.base('appWKgDXDQPkk7xr0');
  const posts = await base('Posts').select().all();

  return posts.map((post) => ({
    id: post.id,
    title: post.fields["Title"] as string,
    content: post.fields["Content"] as string,
    date : post.fields["Date of post"] as string,
  }));
}