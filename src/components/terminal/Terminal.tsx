'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface TermLine {
  type: 'prompt' | 'output' | 'success' | 'error' | 'info' | 'system'
  text: string
  id: number
}

// Static data without IDs to prevent hydration mismatch
const BOOT_DATA = [
  { type: 'system', text: 'YOH_OS v2.0 — KERNEL BOOT SEQUENCE INITIATED' },
  { type: 'system', text: 'Loading secure shell environment...' },
  { type: 'system', text: 'Encryption layer: AES-256 ✓' },
  { type: 'system', text: 'Identity verification: COMPLETE ✓' },
  { type: 'output', text: '─────────────────────────────────────────────' },
  { type: 'info', text: 'Welcome. Type "help" for available commands.' },
  { type: 'output', text: '─────────────────────────────────────────────' },
] as const

const DECRYPT_CHARS = '#@!%$&?*^~<>{}[]|/\\='

function scrambleDecrypt(
  target: string,
  setter: (val: string) => void,
  onDone: () => void
) {
  const steps = 14
  let step = 0
  const interval = setInterval(() => {
    if (step >= steps) {
      setter(target)
      clearInterval(interval)
      onDone()
      return
    }
    const progress = step / steps
    const revealed = Math.floor(progress * target.length)
    const scrambled = target
      .split('')
      .map((c, i) => {
        if (i < revealed) return c
        if (c === ' ') return ' '
        return DECRYPT_CHARS[Math.floor(Math.random() * DECRYPT_CHARS.length)]
      })
      .join('')
    setter(scrambled)
    step++
  }, 55)
}

const CONTACT_DATA = {
  phone: '+251974852985',
  email: 'yohanness1621@gmail.com',
  linkedin: 'linkedin.com/in/yohannes-desalegn',
  github: 'github.com/yohanness16',
  telegram: 't.me/Yohannes_1216',
  whatsapp: '+251974852985',
}

export default function Terminal() {
  const [lines, setLines] = useState<TermLine[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [decryptTarget, setDecryptTarget] = useState<{ id: number; target: string } | null>(null)
  const [decryptDisplay, setDecryptDisplay] = useState('')
  
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Ref-based ID generator to ensure stability across re-renders
  const lineIdRef = useRef(0)
  const nextId = useCallback(() => {
    lineIdRef.current += 1
    return lineIdRef.current
  }, [])

  // Boot Sequence
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < BOOT_DATA.length) {
        setLines((prev) => [...prev, { ...BOOT_DATA[i], id: nextId() } as TermLine])
        i++
      } else {
        clearInterval(interval)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [nextId])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines, decryptDisplay])

  const addLines = useCallback((newLines: Omit<TermLine, 'id'>[]) => {
    newLines.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { ...line, id: nextId() } as TermLine])
      }, i * 100)
    })
  }, [nextId])

  const triggerGlitch = useCallback(() => {
    document.body.classList.add('glitch-flash')
    setTimeout(() => document.body.classList.remove('glitch-flash'), 200)
  }, [])

  const triggerDecrypt = useCallback(
    (target: string, label: string) => {
      const id = nextId()
      const fullTarget = `> ${label}: ${target}`
      const placeholder: TermLine = { type: 'success', text: '', id }
      
      setLines((prev) => [...prev, placeholder])
      setDecryptTarget({ id, target: fullTarget })
      
      scrambleDecrypt(
        fullTarget,
        setDecryptDisplay,
        () => {
          setDecryptTarget(null)
          setLines((prev) =>
            prev.map((l) => (l.id === id ? { ...l, text: fullTarget } : l))
          )
        }
      )
    },
    [nextId]
  )

  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase()
      setLines((prev) => [...prev, { type: 'prompt', text: raw, id: nextId() }])
      if (!cmd) return

      switch (cmd) {
        case 'help':
          addLines([
            { type: 'info', text: '╔══ AVAILABLE COMMANDS ══════════════════════╗' },
            { type: 'output', text: '  sudo show phone       — reveal phone number' },
            { type: 'output', text: '  sudo show email       — reveal email address' },
            { type: 'output', text: '  sudo show linkedin    — open LinkedIn profile' },
            { type: 'output', text: '  sudo show github      — open GitHub profile' },
            { type: 'output', text: '  sudo show telegram    — Telegram handle' },
            { type: 'output', text: '  sudo show whatsapp    — WhatsApp number' },
            { type: 'output', text: '  sudo show full_info   — dump all credentials' },
            { type: 'output', text: '  status                — system diagnostics' },
            { type: 'output', text: '  clear                 — wipe terminal' },
            { type: 'info', text: '╚════════════════════════════════════════════╝' },
          ])
          break
        case 'status':
          addLines([
            { type: 'success', text: '> [SYS] YOH_OS v2.0 — ALL SYSTEMS NOMINAL' },
            { type: 'success', text: '> [NET] Encryption: AES-256 ACTIVE' },
            { type: 'success', text: '> [CPU] Load: 12% — OPTIMAL' },
            { type: 'success', text: '> [MEM] Available: 14.2 GB' },
            { type: 'info', text: '> [LOC] Addis Ababa, Ethiopia — EAT (UTC+3)' },
            { type: 'info', text: '> [STATUS] AVAILABLE FOR HIRE' },
          ])
          break
        case 'clear':
          setLines([])
          break
        case 'sudo show phone':
          triggerGlitch()
          addLines([
            { type: 'info', text: '> Authenticating credentials...' },
            { type: 'info', text: '> Establishing secure channel...' },
            { type: 'info', text: '> Decrypting contact data...' },
          ])
          setTimeout(() => triggerDecrypt(CONTACT_DATA.phone, 'PHONE'), 500)
          break
        case 'sudo show email':
          triggerGlitch()
          addLines([{ type: 'info', text: '> Fetching secure mailbox identifier...' }])
          setTimeout(() => triggerDecrypt(CONTACT_DATA.email, 'EMAIL'), 400)
          break
        case 'sudo show linkedin':
          triggerGlitch()
          addLines([
            { type: 'info', text: '> Routing to professional node...' },
            { type: 'success', text: `> LINKEDIN: ${CONTACT_DATA.linkedin}` },
            { type: 'info', text: '> CONNECTION ESTABLISHED — opening in new tab...' },
          ])
          setTimeout(() => window.open('https://linkedin.com', '_blank'), 900)
          break
        case 'sudo show github':
          triggerGlitch()
          addLines([
            { type: 'info', text: '> Accessing code repository vault...' },
            { type: 'success', text: `> GITHUB: ${CONTACT_DATA.github}` },
            { type: 'info', text: '> REDIRECTING — opening in new tab...' },
          ])
          setTimeout(() => window.open('https://github.com', '_blank'), 900)
          break
        case 'sudo show telegram':
          triggerGlitch()
          addLines([{ type: 'info', text: '> Locating encrypted messaging channel...' }])
          setTimeout(() => triggerDecrypt(CONTACT_DATA.telegram, 'TELEGRAM'), 400)
          break
        case 'sudo show whatsapp':
          triggerGlitch()
          addLines([{ type: 'info', text: '> Decrypting WhatsApp contact data...' }])
          setTimeout(() => triggerDecrypt(CONTACT_DATA.whatsapp, 'WHATSAPP'), 400)
          break
        case 'sudo show full_info':
          triggerGlitch()
          addLines([
            { type: 'info', text: '> INITIATING FULL CREDENTIAL DUMP...' },
            { type: 'info', text: '> Bypassing encryption layers...' },
            { type: 'output', text: '══════════════════════════════════════════' },
            { type: 'success', text: '> NAME      : Yohannes Desalegn' },
            { type: 'success', text: '> ROLE      : Full-Stack Engineer' },
            { type: 'success', text: `> PHONE     : ${CONTACT_DATA.phone}` },
            { type: 'success', text: `> EMAIL     : ${CONTACT_DATA.email}` },
            { type: 'success', text: `> GITHUB    : ${CONTACT_DATA.github}` },
            { type: 'success', text: `> LINKEDIN  : ${CONTACT_DATA.linkedin}` },
            { type: 'success', text: `> TELEGRAM  : ${CONTACT_DATA.telegram}` },
            { type: 'success', text: '> STATUS    : AVAILABLE FOR HIRE' },
            { type: 'success', text: '> LOCATION  : Addis Ababa, Ethiopia' },
            { type: 'output', text: '══════════════════════════════════════════' },
          ])
          break
        case 'sudo rm -rf /':
          triggerGlitch()
          setTimeout(() => triggerGlitch(), 150)
          addLines([
            { type: 'error', text: '> PERMISSION DENIED: Nice try, hacker. 😏' },
            { type: 'error', text: '> Unauthorized destructive command intercepted.' },
            { type: 'info', text: '> (just kidding — but seriously, type "help")' },
          ])
          break
        default:
          if (cmd.startsWith('sudo ')) {
            addLines([
              { type: 'error', text: `sudo: command not recognized: "${raw.slice(5)}"` },
              { type: 'output', text: '> Type "help" to see authorized commands.' },
            ])
          } else {
            addLines([
              { type: 'error', text: `bash: ${raw}: command not found` },
              { type: 'output', text: '> Are you root? Try "sudo show phone"' },
            ])
          }
      }
    },
    [addLines, triggerGlitch, triggerDecrypt, nextId]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = input
      setHistory((prev) => [val, ...prev])
      setHistIdx(-1)
      processCommand(val)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next)
      setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next)
      setInput(next >= 0 ? history[next] : '')
    }
  }

  const lineColors: Record<string, string> = {
    prompt: '#888',
    output: '#444',
    success: '#00cc55',
    error: '#ff0033',
    info: '#4499ff',
    system: 'rgba(255,0,51,0.6)',
  }

  return (
    <div
      style={{
        border: '1px solid rgba(255,0,51,0.3)',
        background: 'rgba(0,0,0,0.97)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 420,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Titlebar */}
      <div style={{
        background: 'rgba(255,0,51,0.07)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid rgba(255,0,51,0.18)',
        flexShrink: 0,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff0033', boxShadow: '0 0 6px #ff0033', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff9900', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#00cc44', display: 'inline-block' }} />
        <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: 3, color: '#666', marginLeft: 10 }}>
          // TERMINAL_ZERO — ROOT_SHELL@yohannes
        </span>
      </div>

      {/* Output */}
      <div 
        ref={outputRef}
        style={{
          flex: 1, overflowY: 'auto', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: 4,
          fontFamily: 'monospace', fontSize: 12, lineHeight: 1.85,
        }}
      >
        {lines.map((line, index) => {
          if (!line) return null
          const isDecryptLine = decryptTarget?.id === line.id

          return (
            <div key={line.id ?? index} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {line.type === 'prompt' && (
                <span style={{ color: '#ff0033', flexShrink: 0 }}>root@yohannes:~$</span>
              )}
              <span style={{ color: lineColors[line.type] ?? '#666' }}>
                {isDecryptLine ? decryptDisplay : line.text}
              </span>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 20px',
        borderTop: '1px solid rgba(255,0,51,0.1)',
        flexShrink: 0,
      }}>
        <span style={{ color: '#ff0033', fontFamily: 'monospace', fontSize: 12, flexShrink: 0 }}>
          root@yohannes:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            fontFamily: 'monospace', fontSize: 12, color: '#fff',
            flex: 1, caretColor: '#ff0033',
          }}
        />
      </div>
    </div>
  )
}