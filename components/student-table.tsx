"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Trash2, Users } from "lucide-react"
import type { Student } from "./student-registration"

interface StudentTableProps {
  students: Student[]
  onMarkAsPaid: (id: string) => void
  onDelete: (id: string) => void
}

export function StudentTable({ students, onMarkAsPaid, onDelete }: StudentTableProps) {
  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium text-muted-foreground">No students registered yet</p>
          <p className="text-sm text-muted-foreground">Add a student using the form above</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Subject 1</TableHead>
                <TableHead>Subject 2</TableHead>
                <TableHead>Exam Fee Status</TableHead>
                <TableHead>Debt (UZS)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.subject1}</TableCell>
                  <TableCell>{student.subject2}</TableCell>
                  <TableCell>
                    {student.isPaid ? (
                      <Badge className="bg-green-600 text-white hover:bg-green-700">Paid</Badge>
                    ) : (
                      <Badge className="bg-red-600 text-white hover:bg-red-700">Unpaid</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={student.isPaid ? "font-semibold text-green-600" : "font-semibold text-red-600"}>
                      {student.debt.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!student.isPaid && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onMarkAsPaid(student.id)}
                          className="text-green-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Mark Paid
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(student.id)}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
