"use client"

import { useState, useEffect } from "react"
import { StudentForm } from "./student-form"
import { StudentTable } from "./student-table"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Users, Banknote } from "lucide-react"

export interface Student {
  id: string
  firstName: string
  lastName: string
  grade: string
  subject1: string
  subject2: string
  isPaid: boolean
  debt: number
}

const STORAGE_KEY = "dtm-students"

export function StudentRegistration() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load students from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setStudents(JSON.parse(stored))
    }
    setIsLoaded(true)
  }, [])

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
    }
  }, [students, isLoaded])

  const addStudent = (student: Omit<Student, "id" | "isPaid" | "debt">) => {
    const newStudent: Student = {
      ...student,
      id: crypto.randomUUID(),
      isPaid: false,
      debt: 10000,
    }
    setStudents((prev) => [...prev, newStudent])
  }

  const markAsPaid = (id: string) => {
    setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, isPaid: true, debt: 0 } : student)))
  }

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id))
  }

  const totalDebt = students.reduce((sum, student) => sum + student.debt, 0)
  const totalStudents = students.length
  const unpaidStudents = students.filter((s) => !s.isPaid).length

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <StudentForm onAddStudent={addStudent} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jami o'quvchilar</p>
              <p className="text-2xl font-bold text-foreground">{totalStudents.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <Banknote className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Umumiy qarzdorlik</p>
              <p className="text-2xl font-bold text-destructive">{totalDebt.toLocaleString()} UZS</p>
              <p className="text-xs text-muted-foreground">{unpaidStudents} ta to'lanmagan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Registered Students</h2>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <StudentTable students={filteredStudents} onMarkAsPaid={markAsPaid} onDelete={deleteStudent} />
      </div>
    </div>
  )
}
