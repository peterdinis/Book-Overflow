"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, User, Menu, PlusCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm"
    >
      <div className="container flex h-20 items-center justify-between gap-6 mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
          </motion.div>

          <div className="flex flex-col">
            <span className="font-bold text-xl hidden sm:inline-block leading-none">
              Book Overflow
            </span>
            <span className="text-xs text-muted-foreground hidden lg:inline-block">
              Ask. Answer. Discover.
            </span>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <motion.div
          className={`flex-1 max-w-2xl transition-all duration-300 ${
            isSearchFocused ? "scale-[1.02]" : ""
          }`}
          animate={{ scale: isSearchFocused ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                isSearchFocused ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <Input
              type="search"
              placeholder="Search books, questions, or topics..."
              className="pl-12 h-12 text-base bg-muted/50 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-200"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </motion.div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button asChild variant="ghost" className="hidden lg:flex gap-2 h-11">
              <Link href="/ask">
                <PlusCircle className="h-4 w-4" />
                Ask Question
              </Link>
            </Button>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-11 w-11">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/ask" className="cursor-pointer">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Ask Question
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile/1" className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login" className="cursor-pointer">
                  Login
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button asChild variant="outline" size="icon" className="hidden lg:flex h-11 w-11 bg-transparent">
              <Link href="/profile/1">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button asChild className="hidden md:flex h-11 px-6 shadow-lg shadow-primary/25">
              <Link href="/login">Login</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
