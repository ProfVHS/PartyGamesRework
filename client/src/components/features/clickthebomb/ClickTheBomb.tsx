import React, { SVGProps, useState } from 'react';
import './ClickTheBombStyle.scss';
import { Button } from '../../UI/Button/Button';

export const ClickTheBomb = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="clickthebomb">
      <div className="clickthebomb__info">
        <span className="clickthebomb__title">Click The Bomb</span>
        <span className="clickthebomb__turn">Ultra Mango Guy Turn</span>
      </div>
      <div className="clickthebomb__bomb">
        <Bomb />
        <span className="clickthebomb__counter">
          {counter >= 10 ? counter : '0' + counter}
        </span>
      </div>
      <Button
        className="clickthebomb__button"
        type="button"
        size="large"
        onClick={() => setCounter((prevCounter) => prevCounter + 1)}
      >
        Click
      </Button>
    </div>
  );
};

const Bomb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={225}
    height={160}
    viewBox="0 0 225 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_384_22)">
      <g filter="url(#filter1_i_384_22)">
        <rect
          x={2.33392}
          y={2.71399}
          width={220}
          height={50}
          rx={5}
          fill="#2C2C2C"
        />
      </g>
      <rect y={52.714} width={225} height={50} rx={5} fill="#1F1F1F" />
      <g filter="url(#filter2_i_384_22)">
        <rect
          x={2.33392}
          y={102.714}
          width={220}
          height={50}
          rx={5}
          fill="#2D2D2D"
        />
      </g>
      <g filter="url(#filter3_i_384_22)">
        <rect x={63} y={41} width={100} height={75} rx={5} fill="#373737" />
      </g>
      <rect
        x={65}
        y={43}
        width={96}
        height={71}
        rx={3}
        stroke="black"
        strokeWidth={4}
      />
      <rect x={26.4688} width={10} height={155} rx={2} fill="black" />
      <rect
        x={188.976}
        y={0.213989}
        width={10}
        height={155}
        rx={2}
        fill="black"
      />
      <path
        d="M75 2C75 0.895431 75.8954 0 77 0H81C82.1046 0 83 0.89543 83 2V41H75V2Z"
        fill="#830101"
      />
      <path
        d="M87 2C87 0.895431 87.8954 0 89 0H93C94.1046 0 95 0.89543 95 2V41H87V2Z"
        fill="#5A189A"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_384_22"
        x={0}
        y={0}
        width={225}
        height={159.214}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_384_22"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_384_22"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_i_384_22"
        x={2.33392}
        y={2.71399}
        width={220}
        height={50}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={4} dy={4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_384_22"
        />
      </filter>
      <filter
        id="filter2_i_384_22"
        x={2.33392}
        y={102.714}
        width={220}
        height={50}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={-4} dy={-4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_384_22"
        />
      </filter>
      <filter
        id="filter3_i_384_22"
        x={63}
        y={41}
        width={100}
        height={75}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={2} dy={4} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_384_22"
        />
      </filter>
    </defs>
  </svg>
);
