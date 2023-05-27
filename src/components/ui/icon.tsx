import { FC } from 'react'

interface iconProps {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & React.RefAttributes<SVGSVGElement>
  >
  onClick?: () => void
}

const IconComponent: FC<iconProps> = ({ icon: Icon, onClick }) => {
  return <Icon className="w-7 text-copper-600 cursor-pointer mb-8" onClick={onClick} />
}

export default IconComponent
