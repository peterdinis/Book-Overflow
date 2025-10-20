"use client"

import { FC, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BookOpen, Plus, X, HelpCircle } from "lucide-react"
import { mockBooks } from "@/mockData/mockData"
import { Navbar } from "../shared/Navbar"

const AskWrapper: FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const bookIdParam = searchParams.get("bookId")

    const [formData, setFormData] = useState({
        bookId: bookIdParam || "",
        title: "",
        content: "",
        tags: [] as string[],
    })
    const [currentTag, setCurrentTag] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const selectedBook = mockBooks.find((b) => b.id === formData.bookId)

    const handleAddTag = () => {
        if (currentTag.trim() && formData.tags.length < 5) {
            setFormData({
                ...formData,
                tags: [...formData.tags, currentTag.trim()],
            })
            setCurrentTag("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToRemove),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false)
            router.push(`/books/${formData.bookId}`)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <motion.main
                className="container max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Left: Question Form */}
                <motion.div
                    className="w-full lg:flex-1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <HelpCircle className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">Ask a Question</CardTitle>
                                    <CardDescription>
                                        Share your curiosity with the community
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Book Select */}
                                <div className="space-y-2">
                                    <Label htmlFor="book">Select Book *</Label>
                                    <Select
                                        value={formData.bookId}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, bookId: value })
                                        }
                                    >
                                        <SelectTrigger id="book">
                                            <SelectValue placeholder="Choose a book" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockBooks.map((book) => (
                                                <SelectItem key={book.id} value={book.id}>
                                                    {book.title} - {book.author}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {selectedBook && (
                                        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mt-2">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            <span className="text-sm">
                                                {selectedBook.title} by {selectedBook.author}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Question Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title">Question Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., What does the green light symbolize in The Great Gatsby?"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        required
                                        className="transition-all duration-200 focus:scale-[1.01]"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Be specific and imagine you're asking a question to another person
                                    </p>
                                </div>

                                {/* Question Details */}
                                <div className="space-y-2">
                                    <Label htmlFor="content">Question Details *</Label>
                                    <textarea
                                        id="content"
                                        placeholder="Provide details about your question..."
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({ ...formData, content: e.target.value })
                                        }
                                        required
                                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                        rows={6}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Include all the information someone would need to answer your question
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (up to 5)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="tags"
                                            placeholder="e.g., symbolism, themes, analysis"
                                            value={currentTag}
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault()
                                                    handleAddTag()
                                                }
                                            }}
                                            disabled={formData.tags.length >= 5}
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleAddTag}
                                            disabled={formData.tags.length >= 5}
                                            variant="outline"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    {formData.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {formData.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                                                    {tag}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(tag)}
                                                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting || !formData.bookId}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                                            Posting Question...
                                        </span>
                                    ) : (
                                        "Post Your Question"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right: Writing Tips */}
                <motion.div
                    className="w-full lg:w-72 flex-shrink-0 space-y-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Writing Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {["Choose the correct book for your question",
                              "Write a clear, specific title",
                              "Provide context and details in the body",
                              "Add relevant tags to help others find your question"].map((tip, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs font-bold text-primary">{idx + 1}</span>
                                    </div>
                                    <p className="text-foreground/80 leading-relaxed">{tip}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="p-4">
                            <p className="text-sm text-foreground/80 leading-relaxed">
                                <strong className="text-foreground">Pro tip:</strong> Search for similar questions before posting to avoid duplicates and find existing answers.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.main>
        </div>
    )
}

export default AskWrapper
