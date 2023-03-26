import {
  Button, Card, CardHeader, Grid, GridItem, Input, useColorMode,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark, Box
} from '@chakra-ui/react'
import styled from '@emotion/styled';
import React, { useState } from 'react'


const BasicDice = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [defaultValue, setDefaultValue] = useState({
    amount: 100,
    winAmount: 198,
    payout: 1.98
  })

  const [sliderValue, setSliderValue] = useState(50)

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }


  const onChangeAmount = (evt: any) => {
    setDefaultValue({ ...defaultValue, amount: evt.target.value })
  }

  const onBlurAmount = (evt: any) => {
    if (Number(evt.target.value) < 100) {
      setDefaultValue({ ...defaultValue, amount: 100 })
    } else {
      setDefaultValue({ ...defaultValue, winAmount: defaultValue.amount * defaultValue.payout })
    }

  }

  return (
    <Card style={{ background: '#17181B' }} >
      <CardHeader>
        <h1 className='text-3xl' >Basic Dice</h1>
      </CardHeader>
      <Grid templateColumns='repeat(4, 1fr)'  >
        <GridItem colSpan={1} className="text-left p-5 text-sm" >
          Amount
          <StyleInput onChange={onChangeAmount} onBlur={onBlurAmount}
            placeholder='Amount' name='amount' value={defaultValue.amount} type="number" />
          Win Amount
          <StyleInput disabled
            placeholder='Win mount' name='winAmount' value={defaultValue.winAmount} type="number" />

          <StyleButton
            _active={{
              transform: 'scale(0.98)',
            }}
            _hover={{
              backgroundImage: 'conic-gradient(from 1turn,#6ACF15,#209B44)'
            }} >Roll Now</StyleButton>
        </GridItem>
        <GridItem colSpan={3} style={{ borderLeft: '1px solid #fff' }} >
          <Box m={10} pb={2} position="relative" >
            <img src="https://bc.game/assets/dice.1007262a.png" alt=""
              style={{ height: '70px', width: '70px', position: 'absolute', left: '47%' }} />

          </Box>
          <StyleDiv className='mx-8' >
            <Box pl={14} pr={14} pt={2} >
              <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
                <StyledSliderMark value={0} {...labelStyles}>
                  0
                </StyledSliderMark>
                <StyledSliderMark value={25} {...labelStyles}>
                  25
                </StyledSliderMark>
                <StyledSliderMark value={51} {...labelStyles}>
                  50
                </StyledSliderMark>
                <StyledSliderMark value={75} {...labelStyles}>
                  75
                </StyledSliderMark>
                <StyledSliderMark value={100} {...labelStyles}>
                  100
                </StyledSliderMark>
                <SliderMark
                  value={sliderValue}
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-55'
                  ml='-5'
                  w='12'
                >
                  {sliderValue}
                </SliderMark>
                <SliderTrack background='#ED6300' p={1.5} borderRadius="15px" >
                  <SliderFilledTrack background='#3BC117' p={1.5} borderRadius="15px" />
                </SliderTrack>
                <SliderThumb height={10} width={35} />
              </Slider>
            </Box>
          </StyleDiv>
          <StyleDiv className='flex flex-row flex-wrap mx-8 p-5' >
            <TitleBorder>
              Payout
              <FieldBorder>
                {defaultValue.payout}
              </FieldBorder>
            </TitleBorder>

            <TitleBorder>
              Roll under
              <FieldBorder>
                {defaultValue.payout}
              </FieldBorder>
            </TitleBorder>

            <TitleBorder>
              Win chance
              <FieldBorder>
                {defaultValue.payout}
              </FieldBorder>
            </TitleBorder>
          </StyleDiv>
        </GridItem>
      </Grid>
    </Card>
  )
}

const StyleInput = styled(Input)({
  margin: '10px 0px'
})

const StyledSliderMark = styled(SliderMark)({
  marginTop: '25px',
  fontSize: '20px'
})

const StyleButton = styled(Button)({
  backgroundImage: 'conic-gradient(from 1turn,#6ACF15,#209B44)',
  width: '100%',
  margin: '10px 0px',
  height: '60px',
  fontWeight: 'bold'
})

const StyleDiv = styled('div')({
  background: '#222328',
  marginTop: '120px'
})

const TitleBorder = styled('div')({
  margin: '4px 12px',
})

const FieldBorder = styled('div')({
  background: '#2A2B32',
  padding: '4px 12px',
  width: '150px'
})


export default BasicDice

