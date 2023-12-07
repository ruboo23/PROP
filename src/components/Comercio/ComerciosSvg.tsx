import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"

const SvgPlace = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      d="M8 8c.367 0 .68-.13.942-.392.26-.26.391-.575.391-.941 0-.367-.13-.68-.391-.942A1.284 1.284 0 0 0 8 5.333c-.367 0-.68.13-.942.392a1.284 1.284 0 0 0-.391.942c0 .366.13.68.391.941C7.32 7.87 7.633 8 8 8Zm0 4.9c1.356-1.244 2.361-2.375 3.017-3.392.655-1.016.983-1.92.983-2.708 0-1.211-.386-2.203-1.158-2.975-.773-.772-1.72-1.158-2.842-1.158s-2.07.386-2.842 1.158C4.386 4.597 4 5.589 4 6.8c0 .789.328 1.692.983 2.708C5.64 10.525 6.644 11.656 8 12.9Zm0 1.767c-1.789-1.523-3.125-2.936-4.008-4.242C3.108 9.119 2.667 7.911 2.667 6.8c0-1.667.536-2.994 1.608-3.983C5.347 1.827 6.589 1.333 8 1.333s2.653.495 3.725 1.484 1.608 2.316 1.608 3.983c0 1.111-.441 2.32-1.325 3.625-.883 1.306-2.22 2.72-4.008 4.242Z"
    />
  </Svg>
)

const SvgStar = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      scale={0.9}
      fill="#888DC7"
      d="M6.546.984a.5.5 0 0 1 .908 0L9.14 4.64a.5.5 0 0 0 .395.287l3.997.474a.5.5 0 0 1 .28.864l-2.954 2.733a.5.5 0 0 0-.151.464l.784 3.948a.5.5 0 0 1-.735.534l-3.512-1.966a.5.5 0 0 0-.488 0l-3.512 1.966a.5.5 0 0 1-.735-.534l.784-3.948a.5.5 0 0 0-.15-.464L.186 6.264A.5.5 0 0 1 .468 5.4l3.997-.474a.5.5 0 0 0 .395-.287L6.546.984Z"
    />
  </Svg>
)

const SvgShapeStar = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="none"
      stroke={'#888DC7'}
      strokeWidth={1}
      scale={0.85}
      d="M6.546.984a.5.5 0 0 1 .908 0L9.14 4.64a.5.5 0 0 0 .395.287l3.997.474a.5.5 0 0 1 .28.864l-2.954 2.733a.5.5 0 0 0-.151.464l.784 3.948a.5.5 0 0 1-.735.534l-3.512-1.966a.5.5 0 0 0-.488 0l-3.512 1.966a.5.5 0 0 1-.735-.534l.784-3.948a.5.5 0 0 0-.15-.464L.186 6.264A.5.5 0 0 1 .468 5.4l3.997-.474a.5.5 0 0 0 .395-.287L6.546.984Z"
    />
  </Svg>
)

const SvgPhone = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      d="M11.3 13.091c-1.389 0-2.761-.33-4.117-.99-1.355-.662-2.589-1.598-3.7-2.81A13.52 13.52 0 0 1 .908 5.255C.303 3.775 0 2.279 0 .764c0-.219.067-.4.2-.546A.65.65 0 0 1 .7 0h2.7c.156 0 .294.058.417.173a.68.68 0 0 1 .216.409l.434 2.545c.022.194.016.358-.017.491a.783.783 0 0 1-.183.346L2.65 5.745c.222.449.486.882.792 1.3.305.419.641.822 1.008 1.21.344.375.706.724 1.083 1.045.378.321.778.615 1.2.882L8.3 8.472c.1-.108.23-.19.392-.245a.988.988 0 0 1 .475-.045l2.3.509a.767.767 0 0 1 .383.264c.1.127.15.27.15.427v2.945c0 .219-.067.4-.2.546a.65.65 0 0 1-.5.218ZM2.017 4.364l1.1-1.2-.284-1.71H1.35c.056.498.133.988.233 1.473.1.485.245.964.434 1.437Zm5.966 6.509c.434.206.875.37 1.325.49.45.122.903.2 1.359.237V10L9.1 9.655l-1.117 1.218Z"
    />
  </Svg>
)

const SvgClock = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      d="m10.2 11.133.933-.933-2.466-2.467V4.667H7.333v3.6l2.867 2.866ZM8 14.667a6.492 6.492 0 0 1-2.6-.525 6.732 6.732 0 0 1-2.117-1.425A6.733 6.733 0 0 1 1.858 10.6 6.492 6.492 0 0 1 1.333 8c0-.922.175-1.789.525-2.6a6.732 6.732 0 0 1 1.425-2.117c.6-.6 1.306-1.075 2.117-1.425A6.492 6.492 0 0 1 8 1.333c.922 0 1.789.175 2.6.525.811.35 1.517.825 2.117 1.425.6.6 1.075 1.306 1.425 2.117.35.811.525 1.678.525 2.6 0 .922-.175 1.789-.525 2.6a6.733 6.733 0 0 1-1.425 2.117c-.6.6-1.306 1.075-2.117 1.425a6.492 6.492 0 0 1-2.6.525Zm0-1.334c1.478 0 2.736-.52 3.775-1.558 1.039-1.039 1.558-2.297 1.558-3.775 0-1.478-.52-2.736-1.558-3.775C10.736 3.186 9.478 2.667 8 2.667c-1.478 0-2.736.52-3.775 1.558C3.186 5.264 2.667 6.522 2.667 8c0 1.478.52 2.736 1.558 3.775C5.264 12.814 6.522 13.333 8 13.333Z"
    />
  </Svg>
)

const SvgExpand = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      d="m10.5 13.453-5.25-5.25 1.225-1.225 4.025 4.025 4.025-4.025 1.225 1.225-5.25 5.25Z"
    />
  </Svg>
)

const SvgUnExpand = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      d="m10.25 4 5.25 5.25-1.225 1.225L10.25 6.45l-4.025 4.025L5 9.25 10.25 4Z"
    />
  </Svg>
)

const SvgEllipse = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Circle cx={20} cy={20} r={19.5} fill="#fff" stroke={props.color ? props.color : '#000'} />
  </Svg>
)

const SvgPencil = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#888DC7"
      scale={1.2}
      d="M1.556 12.444h1.108l7.603-7.602-1.109-1.109-7.602 7.603v1.108ZM0 14v-3.306L10.267.447c.155-.142.327-.253.515-.33.188-.078.386-.117.593-.117.207 0 .408.039.603.117.194.077.363.194.505.35l1.07 1.089c.155.142.269.31.34.505a1.684 1.684 0 0 1 0 1.176c-.071.188-.185.36-.34.516L3.306 14H0Zm9.703-9.703-.545-.564 1.109 1.109-.564-.545Z"
    />
  </Svg>
)

const SvgFixed = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={props.stroke}
      strokeWidth={2}
      fill={props.color}
      d="M0 24V2.667C0 1.933.266 1.306.797.783A2.637 2.637 0 0 1 2.714 0h13.572c.746 0 1.385.261 1.917.783.531.523.797 1.15.797 1.884V24l-9.5-4L0 24Z"
    />
  </Svg>
)

const SvgPlus = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#fff"
      d="M18.644 21.32H8.74v-2.677h9.904V8.74h2.676v9.904h9.904v2.677H21.32v9.904h-2.676V21.32Z"
    />
  </Svg>
)

const SvgEllipseViolet = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Circle cx={26.5} cy={26.5} r={26.5} fill="#888DC7" />
  </Svg>
)

const SvgAddImage = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      scale={1.3}
      d="M5 21c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 3 19V5c0-.55.196-1.02.587-1.413A1.926 1.926 0 0 1 5 3h9v2H5v14h14v-9h2v9c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 0 1 19 21H5ZM17 9V7h-2V5h2V3h2v2h2v2h-2v2h-2ZM6 17h12l-3.75-5-3 4L9 13l-3 4Z"
    />
  </Svg>
)

const SvgClose = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#000"
      d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19Z"
    />
  </Svg>
)

const SvgLogOut = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#888DC7"
      d="M2 18c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 0 16V2C0 1.45.196.98.588.587A1.926 1.926 0 0 1 2 0h7v2H2v14h7v2H2Zm11-4-1.375-1.45 2.55-2.55H6V8h8.175l-2.55-2.55L13 4l5 5-5 5Z"
    />
  </Svg>
)

export { SvgClose, SvgLogOut, SvgPencil, SvgShapeStar, SvgAddImage, SvgPlace, SvgStar, SvgPhone, SvgClock, SvgExpand, SvgUnExpand, SvgEllipse, SvgFixed, SvgPlus, SvgEllipseViolet };
