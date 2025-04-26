import { Contact2, X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "../ui/alert-dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"

export default function Contact() {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><Contact2 className="mr-2" />CONTACT ME</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel className="absolute right-4 top-4" >
            <X className="h-4 w-4" />
        </AlertDialogCancel>

        <AlertDialogHeader>
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Get in Touch
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </AlertDialogHeader>

        <AlertDialogDescription>
          <form className="my-2" onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name" className="block mb-2 text-sm font-medium">Name</Label>
              <Input 
                id="name" 
                placeholder="Vignesh Reddy" 
                type="text" 
                className="w-full"
                required
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="email" className="block mb-2 text-sm font-medium">Email Address</Label>
              <Input 
                id="email" 
                placeholder="vignesh@gmail.com" 
                type="email" 
                className="w-full"
                required
              />
            </div>
            
            <div className="mb-6">
              <Label htmlFor="message" className="block mb-2 text-sm font-medium">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message here..."
                className="w-full min-h-32"
                required
              />
            </div>
    
            <Button 
              className="w-full"
              type="submit"
            >
              Send Message
            </Button>
          </form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}
