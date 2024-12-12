import { redirect } from 'next/navigation'

function navigate(link) {
  redirect(link)
}

export default {
  navigate
}