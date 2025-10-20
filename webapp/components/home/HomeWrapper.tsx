"use client"

import { FC, useState } from "react";
import { Navbar } from "../shared/Navbar";
import { mockBooks } from "@/mockData/mockData";
import { Filter, MessageSquare, Sparkles, Star, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { motion } from "framer-motion";

const HomeWrapper: FC = () => {
  const [sortBy, setSortBy] = useState("popular");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const genres = ["all", ...Array.from(new Set(mockBooks.map((book) => book.genre)))];

  const filteredBooks = mockBooks
    .filter((book) => selectedGenre === "all" || book.genre === selectedGenre)
    .sort((a, b) => {
      if (sortBy === "popular") return b.questionCount - a.questionCount;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span>Join thousands of book lovers</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Discover Your Next
            <span className="text-primary"> Great Read</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore our curated collection, ask questions, and connect with a community of passionate readers.
          </p>

          <Button
            asChild
            size="lg"
            className="group h-14 px-8 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all"
          >
            <Link href="/ask" className="flex items-center gap-3 justify-center">
              <MessageSquare className="h-5 w-5" />
              Ask a Question
            </Link>
          </Button>
        </motion.div>

        {/* FILTER BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-6xl flex flex-col sm:flex-row gap-4 items-start sm:items-center p-6 rounded-2xl bg-muted/30 border border-border/50 mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-semibold">Filter & Sort</span>
          </div>
          <div className="flex flex-wrap gap-3 flex-1">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[200px] h-11 bg-background">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre === "all" ? "All Genres" : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] h-11 bg-background">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}
          </Badge>
        </motion.div>

        {/* BOOK GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl"
        >
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Link href={`/books/${book.id}`}>
                <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:border-primary/50 overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={book.cover || "/placeholder.svg"}
                        alt={book.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm shadow-lg border-border/50 text-foreground">
                        {book.genre}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="font-bold text-lg line-clamp-2 hover:text-primary transition-colors leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">{book.author}</p>
                    <p className="text-sm text-foreground/70 line-clamp-2 leading-relaxed">{book.description}</p>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border/50 mt-auto">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm font-medium">{book.questionCount}</span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default HomeWrapper;
