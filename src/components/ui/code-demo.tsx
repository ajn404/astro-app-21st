"use client"

import {
    CodeBlock,
    CodeBlockCode,
    CodeBlockGroup,
} from "@/components/ui/code-block"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import code from '../Sidebar.astro?raw'

export function CodeBlockThemed() {
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full m-auto max-h-full">
            <CodeBlock>
                <CodeBlockGroup className="border-border border-b px-4 py-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                            JavaScript
                        </div>
                        <span className="text-muted-foreground text-sm">
                            GitHub Dark Theme
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleCopy}
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </CodeBlockGroup>
                <CodeBlockCode code={code} language="javascript" theme="github-dark" />
            </CodeBlock>
        </div>
    )
}
