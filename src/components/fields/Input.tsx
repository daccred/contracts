type RefReturnType =
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | any;
type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label: string;
    register: ({ required }: { required?: boolean }) => RefReturnType;
};


export default function TextInput(props: InputProps) {
  const { type, name, placeholder, label, register, required, ...rest } = props;

  return (
    <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label htmlFor="name" className="block text-xs font-medium text-gray-900">
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full p-0 text-gray-900 placeholder-gray-500 border-0 focus:ring-0 sm:text-sm"
        placeholder="Jane Doe"
      />
    </div>
  )
}