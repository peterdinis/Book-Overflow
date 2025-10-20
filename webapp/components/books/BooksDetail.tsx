"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MessageSquare, Eye, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { mockBooks, mockQuestions } from "@/mockData/mockData"
import { Navbar } from "../shared/Navbar"

export default function BooksDetail({ params }: { params: { id: string } }) {
  const { id } = params
  const book = mockBooks.find((b) => b.id === id)
  const questions = mockQuestions.filter((q) => q.bookId === id)

  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          <aside className="animate-in fade-in slide-in-from-left duration-700">
            <Card className="sticky top-24">
              <CardHeader className="p-0">
                <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                  <img src={book.cover || "/placeholder.svg"} alt={book.title} className="object-cover w-full h-full" />
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h1 className="font-bold text-xl mb-1 text-balance">{book.title}</h1>
                  <p className="text-muted-foreground">{book.author}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{book.rating}</span>
                  </div>
                  <Badge variant="secondary">{book.genre}</Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="font-medium">{book.questionCount}</span>
                  </div>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link href={`/ask?bookId=${book.id}`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ask Question
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
              <h2 className="text-3xl font-bold mb-4">About this book</h2>
              <p className="text-foreground/80 leading-relaxed">{book.description}</p>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Questions ({questions.length})</h2>
                <Button asChild variant="outline">
                  <Link href={`/ask?bookId=${book.id}`}>Ask Question</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Link
                    key={question.id}
                    href={`/questions/${question.id}`}
                    className="block animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          TODO VOTE BUTTONS

                          <div className="flex-1 space-y-3">
                            <h3 className="font-bold text-lg hover:text-primary transition-colors text-balance">
                              {question.title}
                            </h3>
                            <p className="text-foreground/70 line-clamp-2 leading-relaxed">{question.content}</p>

                            <div className="flex flex-wrap items-center gap-2">
                              {question.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{question.answerCount} answers</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{question.views} views</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={question.userAvatar || "/placeholder.svg"} />
                                  <AvatarFallback>{question.userName[0]}</AvatarFallback>
                                </Avatar>
                                <span>{question.userName}</span>
                                <span>•</span>
                                <span>{question.createdAt}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}