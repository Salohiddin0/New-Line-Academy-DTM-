import { StudentRegistration } from "@/components/student-registration"

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-foreground">DTM Exam Registration</h1>
        <p className="mb-8 text-muted-foreground">Register students for DTM exams and manage exam fee payments</p>
        <StudentRegistration />
      </div>
    </main>
  )
}
