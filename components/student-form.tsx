'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus } from 'lucide-react'
import type { Student } from './student-registration'

const GRADES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Abiturient']

const SUBJECTS = [
  'Matematika',
  'Ingliz tili',
  'Ona tili',
  'Kimyo',
  'Biologiya',
  'Fizika',
  'Tarix',
  'Rus tili',
  'Turk tili',
  'Nemis tili',
  'Koreys tili',
  'Huquq',
]

interface StudentFormProps {
  onAddStudent: (student: Omit<Student, 'id' | 'isPaid' | 'debt'>) => void
}

export function StudentForm ({ onAddStudent }: StudentFormProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [grade, setGrade] = useState('')
  const [subject1, setSubject1] = useState('')
  const [subject2, setSubject2] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !grade || !subject1 || !subject2) {
      return
    }

    onAddStudent({
      firstName,
      lastName,
      grade,
      subject1,
      subject2
    })

    // Reset form
    setFirstName('')
    setLastName('')
    setGrade('')
    setSubject1('')
    setSubject2('')
  }

  const availableSubjects2 = SUBJECTS.filter(s => s !== subject1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <UserPlus className='h-5 w-5' />
          Register New Student
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
        >
          <div className='space-y-2'>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              id='firstName'
              placeholder='Enter first name'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              id='lastName'
              placeholder='Enter last name'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='grade'>Grade</Label>
            <Select value={grade} onValueChange={setGrade} required>
              <SelectTrigger id='grade'>
                <SelectValue placeholder='Select grade' />
              </SelectTrigger>
              <SelectContent>
                {GRADES.map(g => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subject1'>Subject 1</Label>
            <Select value={subject1} onValueChange={setSubject1} required>
              <SelectTrigger id='subject1'>
                <SelectValue placeholder='Select subject' />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map(s => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='subject2'>Subject 2</Label>
            <Select
              value={subject2}
              onValueChange={setSubject2}
              required
              disabled={!subject1}
            >
              <SelectTrigger id='subject2'>
                <SelectValue placeholder='Select subject' />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects2.map(s => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-end'>
            <Button type='submit' className='w-full'>
              <UserPlus className='mr-2 h-4 w-4' />
              Add Student
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
