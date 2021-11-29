import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { joinClassNames } from '@/lib/helper'
import {RiSurveyLine, RiFileExcel2Line, RiContactsBook2Line} from 'react-icons/ri'

const mediums = [
  { id: 1, title: 'Quick Forms', description: 'use a quick form to collect the data you need', icon: RiSurveyLine },
  { id: 2, title: 'Import from CSV/Excel', description: 'Import recipients from a .csv, .xlsx file', icon: RiFileExcel2Line},
  { id: 3, title: 'Import from Contacts', description: 'Import recipients from your google contact', icon:  RiContactsBook2Line },
]

export default function RadioBox({ label }) {
  const [selectedMedium, setSelectedMedium] = useState(mediums[0])

  return (
    <RadioGroup value={selectedMedium} onChange={setSelectedMedium}>
      <RadioGroup.Label className="text-base font-medium text-gray-900">{label || "Select a Medium"}</RadioGroup.Label>

      <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {mediums.map((medium) => (
          <RadioGroup.Option
            key={medium.id}
            value={medium}
            className={({ checked, active }) =>
              joinClassNames(
                checked ? 'border-transparent' : 'border-gray-300',
                active ? 'ring-2 ring-primary-500' : '',
                'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex flex-1">
                  <div className="flex flex-col">
                    <RadioGroup.Description as="span" className="mt-1 mb-4 text-sm font-medium text-gray-900">
                      <medium.icon className='w-8 h-8 text-primary-600' aria-hidden='true' />
                    </RadioGroup.Description>

                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {medium.title}
                    </RadioGroup.Label>

                    <RadioGroup.Description as="span" className="flex items-center mt-1 text-sm text-gray-500">
                      {medium.description}
                    </RadioGroup.Description>
                  </div>
                </div>
                <CheckCircleIcon
                  className={joinClassNames(!checked ? 'invisible' : '', 'h-5 w-5 text-primary-600')}
                  aria-hidden="true"
                />
                <div
                  className={joinClassNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-primary-500' : 'border-transparent',
                    'absolute -inset-px rounded-lg pointer-events-none'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
