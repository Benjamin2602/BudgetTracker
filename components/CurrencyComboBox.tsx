"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Currencies, Currency } from "@/lib/currency"



export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
    null
  )

  return (
    <div className="flex items-center space-x-4">
      {/* <p className="text-sm text-muted-foreground">Status</p> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedOption? <>{selectedOption.label}</> : <> Set currency</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="filter currency..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {Currencies.map((currency : Currency) => (
                  <CommandItem
                    key={currency.value}
                    value={currency.value}
                    onSelect={(value) => {
                      setSelectedOption(
                        Currencies.find((priority) => priority.value === value) ||
                          null
                      )
                      setOpen(false)
                    }}
                  >
                    {currency.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
