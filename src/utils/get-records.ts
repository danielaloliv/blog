
import { z } from "zod";
import { airtable } from "./airtable";
import { DateTime } from "luxon";

const postSchema = z.object({
  ["Title"]: z.string(),
  ["Lead"]: z.string(),
  ["Content"]: z.string(),
  ["Date of post"]: z.string(),
});

export async function getRecords() {
  const base = airtable.base('appWKgDXDQPkk7xr0');
  const posts = await base('Posts').select().all();
  return posts
    .map((post) => {
      const fields = postSchema.parse(post.fields);
      return {
        id: post.id,
        title: fields.Title,
        content: fields.Content,
        lead: fields.Lead,
        date: DateTime
          .fromFormat(fields["Date of post"], "yyyy-MM-dd")
          .toFormat("dd/MM/yyyy"),
      }
    });
}