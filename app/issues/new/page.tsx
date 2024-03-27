import dynamic from "next/dynamic"
import IssueFromSkeleton from "./loading"

/* Add dynamic function - import issue form component and loadning skeleton tsx */
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr: false,
    loading: () => <IssueFromSkeleton />
  },
)

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage