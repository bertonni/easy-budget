module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fill': 'repeat(auto-fill, minmax(300px, 1fr))'
      },
      backgroundImage: {
        'texture': "url('/public/images/bg-texture.png')",
        'white-lines': "url('/public/images/creative-background-with-white-lines.jpg')",
      },
      colors: {
        'yellow-450': '#F2D763',
        'yellow-550': '#E8B102'
      },
      fontFamily: {
        'lato' : ['Lato']
      },
      maxHeight: {
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
      },
      minWidth: {
        '28': '7rem',
        '32': '8rem'
      }
    },
  },
  plugins: [],
}
