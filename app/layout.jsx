import './globals.css'

export const metadata = {
  title: 'Free Social Security Disability Evaluation | Hiller Comerford',
  description: 'Find out if you qualify for Social Security Disability benefits. Free evaluation, no obligation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
