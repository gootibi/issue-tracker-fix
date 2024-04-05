This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# prisma: npm i prisma@5.3.1
#         npx prisma init
# Create schema, then go terminal:
#         npx prisma format
#         npx prisma migrate dev

# Request data validation use Zod
# npm i zod@3.22.2

# Set up radix-ui: https://www.radix-ui.com/themes/docs/overview/getting-started
# npm install @radix-ui/themes
# layout.tsx (root):
# import '@radix-ui/themes/styles.css';
# import { Theme } from '@radix-ui/themes';
# export default function () {
#  return (
#    <html>
#      <body>
#        <Theme>
#          <MyApp />
#        </Theme>
#      </body>
#    </html>
#  );
# }

# radix-ui typography: https://www.radix-ui.com/themes/docs/theme/typography

# React SimpleMDE (EasyMDE) Markdown Editor use. Google search: react-simplemde-editr
# https://www.npmjs.com/package/react-simplemde-editor#install
# Install: npm install --save react-simplemde-editor easymde
# Use: import SimpleMDE from "react-simplemde-editor";
#      import "easymde/dist/easymde.min.css";
#      <SimpleMDE />;

# https://react-hook-form.com/get-started - Easy to handle form submission
# npm install react-hook-form@7.46.1

# axios install to fetch
# npm i axios@1.5.0

# Validation: npm i @hookform/resolvers@3.3.1 // Integrate with various data validation libraries like zod

# Tailwind element loading spinners: https://tw-elements.com/docs/standard/components/spinners/
# Add spining the submit button and disable the submit button when onclick

# Delay - simulate the slow server

# Loading Skeleton: npm i react-loading-skeleton@3.3.1 - https://www.npmjs.com/package/react-loading-skeleton

# React Markdown: npm i react-markdown@8.0.4 
#    - Help with the text edition and right rendering - /app/issues/[id]/page.tsx import: import ReactMarkdown from 'react-markdown' and give it.
# And go google and search -> "tailwind typography" -> Introducing Tailwind CSS Typography https://tailwindcss.com/docs/plugins#typography - Install: npm install -D @tailwindcss/typography
# Import in tailwind.config.ts file - in plugins array: require('@tailwindcss/typography')
# And give it element className="prose".

# Radix UI: Breakpoints - Built-in breakpoints allow you to easily build adaptive layouts.  
# https://www.radix-ui.com/themes/docs/theme/breakpoints:
#       - initial - Phones (portrait) - 0px
#       - xs - Phones (landscape) - 520px ...

# Radix UI: Icons: https://www.radix-ui.com/icons
#           install: npm i @radix-ui/react-icons
#           page.tsx: import { FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons'

Caching: in google search: "nextjs route segment config" -> https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
    Page build static - import client dynamic
        Server cache refreshing:
                // manual refresh the page -> the page data refresh:
            - export const dynamic = "force-dynamic"   
                // false | 0 | number -> Example: Every 30 seconds refresh the page
            - export const revalidate = 30
                ...

        Client side ceche refreshing:
            In IssueForm.tsx:
            - router.refresh() // refresh the page automatically

Next-Auth.js: https://next-auth.js.org/ or https://authjs.dev/?_gl=1*t9afjz*_gcl_au*MTU3Mzk2MzI4Mi4xNzExMDI5Njc4LjE0OTI0NDg4MDMuMTcxMTExNzgyNy4xNzExMTE3OTc2
    Install: npm i next-auth@4.23.1
    .env file create NEXTAUTH_URL and NEXTAUTH_SECRET - secret key create in Gith Bush prog. -> "openssl rand -base64 32"
    Cretate: app/api/auth/[...nextauth]/route.ts : 
                                                import NextAuth from "next-auth"

                                                const handler = NextAuth({
                                                    ...
                                                })

                                                export { handler as GET, handler as POST }
    
    Google Cloud Console: https://console.cloud.google.com/
                        Create API - Credentials...
                        
Setting Up React Query: Google search -> tanstack react query (TanStack Query) -> https://tanstack.com/query/latest
    Install: https://tanstack.com/query/latest/docs/framework/react/installation -> npm i @tanstack/react-query@4.35.3
    Create: /app/QueryClientProvider.tsx -> This query client contains a cache for storing data we get from the backend

React Hot Toast: https://react-hot-toast.com/ - when backend fails show the toast notification for user
    Install: npm i react-hot-toast@2.4.1
    Use: AssigneeSelect.tsx
            ...
            import toast, { Toaster } from 'react-hot-toast'
            ...
            axios
                .patch(...)
                .catch(() => toast.error('Changes could not be saved'))
            ...
            <Toaster />
            ...

Generating Dummy Data: ChatGPT: https://chat.openai.com/
    Message: 
        Give the following prisma model, generate SQL statement to insert 20 records in the issues table. Use real-world titles and descriptions for issues. Status can be OPEN, IN_PROGRES or CLOSED. Descriptions should be a paragraph long. Provide different values for the createdAt and updatedAt columns.  

        model Issue {
            id               Int      @id @default(autoincrement())
            title            String   @db.VarChar(255)
            description      String   @db.Text
            status           Status   @default(OPEN)
            createdAt        DateTime @default(now())
            updatedAt        DateTime @updatedAt
        }

Reacharts: grafikon maker api https://recharts.org/en-US/     
    Install: npm install recharts@2.8.0
    Add /app/IssueChart.tsx - set the bar chart.

Metadata: add static and dynamic metadata
    Static:
        export const metadata: Metadata = {
            title: 'Issue Tracker - Dashboard',
            description: 'View a summary of project issues',
        }
    Dynamic:
        export async function generateMetadata({ params }: Props) {
            const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
            return {
                title: issue?.title,
                description: `Details of issue id: ${issue?.id}`
            }
        }






