module.exports = {
  content: [`${__dirname}/src/**/*.{ts,js,tsx,jsx}`],
  theme: {
    screens: {
      xxs: { max: '376px' },
      xs: { max: '572px' },
      sm: { max: '768px' },
      md: { max: '1004px' },
      lg: '1005px',
      xl: '1200px'
    }
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.hover': {
          '&:hover': {
            opacity: 0.7
          }
        },
        '.focus': {
          '&:focus': {
            color: 'var(--color-orange)'
          }
        },
        '.active': {
          '&:active': {
            position: 'relative',
            top: '1px',
            left: '1px'
          }
        }
      })
    }
  ]
}
