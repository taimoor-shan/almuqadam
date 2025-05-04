// A simple Netlify Edge Function
export default async (request, context) => {
  return new Response("Hello from Netlify Edge Functions!");
};
