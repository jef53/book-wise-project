import { styled } from "../../../stitches.config";

export const Container = styled('section', {
  display: 'flex',
  marginTop: 30,
  flexDirection: 'column',
  gap: '$4',
})

export const AuthButton = styled('button', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'left',
  backgroundColor: '$gray600',
  color: '$gray100',
  padding: 13,
  border: 'transparent',
  borderRadius: 6,



  img: {
    paddingRight: 20,
  }
})