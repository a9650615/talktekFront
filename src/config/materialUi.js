import green from 'material-ui/colors/green'

export default {
  palette: {
    secondary: {
      ...green,
      A400: '#49BCE8',
      A200: '#21E8CD'
    }
  },
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3
      }
    }
  }
}