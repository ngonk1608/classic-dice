import {
  Button,
  Card,
  CardHeader,
  Grid,
  GridItem,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  useMediaQuery
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";

const BasicDice = () => {
  const [defaultValue, setDefaultValue] = useState({
    amount: 100,
    winAmount: 198,
  });
  const [isMobile] = useMediaQuery('(max-width: 600px)')

  const [payout, setPayout] = useState(1.98)
  const [sliderValue, setSliderValue] = useState(50);
  const [winChance, setWinChance] = useState(50);
  const [result, setResult] = useState(50);
  const [isUnder, setIsUnder] = useState(true);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const [listResult, setListResult]: any = useState([]);

  const NumberAnimate = (n: any) => {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 10,
      config: { mass: 1, tension: 10, friction: 10 },
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  };

  const onChangeAmount = (evt: any) => {
    setDefaultValue({ ...defaultValue, amount: evt.target.value });
  };

  // const onChangeAmount = (evt: any) => {
  //   setDefaultValue({ ...defaultValue, amount: evt.target.value })
  // }

  useEffect(() => {
    if (isUnder) {
      setWinChance(sliderValue);
    } else {
      setWinChance(100 - sliderValue);
    }
  }, [sliderValue, isUnder]);

  const onSlideValue = (type: any) => {
    if (type === "plus") {
      if (sliderValue + 5 >= 99) {
        setSliderValue(99);
      } else {
        setSliderValue(sliderValue + 5);
      }
    } else {
      if (sliderValue - 5 <= 2) {
        setSliderValue(2);
      } else {
        setSliderValue(sliderValue - 5);
      }
    }
  };

  const onBlurAmount = (evt: any) => {
    if (Number(evt.target.value) < 100) {
      setDefaultValue({ ...defaultValue, amount: 100 });
    } else {
      setDefaultValue({
        ...defaultValue,
        winAmount: defaultValue.amount * payout,
      });
    }
  };

  useEffect(() => {
    const res: any = 99/winChance
    setPayout(res.toFixed(4))
  }, [winChance])

  useEffect(() => {
    if(sliderValue<2) {
      setSliderValue(2)
    } else if (sliderValue > 99) {
      setSliderValue(99)
    }
  }, [sliderValue])


  const onRoll = () => {
    const res = Math.floor(Math.random() * (100 - 0 + 1) + 0);
    setResult(res);
    const arrTemp: any = listResult
    if(isMobile) {
      if (arrTemp.length >= 5){
        arrTemp.shift()
      }
    } else if (!isMobile) {
      if (arrTemp.length > 8){
        arrTemp.shift()
      }
    }

    if (isUnder) {
      if (res < sliderValue) {
        arrTemp.push({ value: res, win: true })
      } else {
        arrTemp.push({ value: res, win: false })
      }
    } else {
      if (res < sliderValue) {
        arrTemp.push({ value: res, win: false })
      } else {
        arrTemp.push({ value: res, win: true })
      }
    }
    setListResult(arrTemp)

  };

  return (
    <Card style={{ background: "#17181B" }}>
      <CardHeader>
        <h1 className="text-3xl">Basic Dice</h1>
      </CardHeader>
      <Grid
        column={[1, 2]}
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
      >
        <GridItem colSpan={1} className="text-left p-5 text-sm">
          Amount
          <StyleInput
            onChange={onChangeAmount}
            onBlur={onBlurAmount}
            placeholder="Amount"
            name="amount"
            value={defaultValue.amount}
            type="number"
          />
          Win Amount
          <StyleInput
            disabled
            placeholder="Win mount"
            name="winAmount"
            value={defaultValue.winAmount}
            type="number"
          />
          <StyleButton
            onClick={onRoll}
            _active={{
              transform: "scale(0.98)",
            }}
            _hover={{
              backgroundImage: "conic-gradient(from 1turn,#6ACF15,#209B44)",
            }}
          >
            Roll Now
          </StyleButton>
        </GridItem>
        <GridItem colSpan={3} style={{ borderLeft: "1px solid #fff" }}>
          {listResult ? (
            <div className="flex flex-row justify-center">
              {listResult.map((res: any, index: any) =>
                res?.win ? (
                  <WinDiv key={index}>{res?.value}</WinDiv>
                ) : (
                  <LossDiv key={index}>{res?.value}</LossDiv>
                )
              )}
            </div>
          ) : (
            <Box
              position="relative"
              style={{
                background: "#272A2D",
                margin: "10px 20px",
                height: "50px",
              }}
            >
              Game results will be displayed here.
            </Box>
          )}
          <Box m={14} pb={5} position="relative">
            <div
              style={{ left: `${result - (isMobile ? 8 : 5)}%`, transition: "left 2s" }}
              className="flex flex-col items-center justify-center absolute"
            >
              <ResultDiv>{NumberAnimate(result)}</ResultDiv>
              <DiceImg src="https://bc.game/assets/dice.1007262a.png" alt="" />
            </div>
          </Box>
          <StyleDiv className="mx-8" style={{ marginTop: "200px" }}>
            <Box pl={10} pr={10} pt={2}>
              <Slider
                aria-label="slider-ex-6"
                value={sliderValue}
                onChange={(val) => setSliderValue(val)}
              >
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
                  textAlign="center"
                  bg="blue.500"
                  color="white"
                  mt="-55"
                  ml="-5"
                  w="12"
                >
                  {sliderValue}
                </SliderMark>
                <SliderTrack
                  background={`${isUnder ? "#ED6300" : "#3BC117"}`}
                  p={1.5}
                  borderRadius="15px"
                >
                  <SliderFilledTrack
                    background={`${isUnder ? "#3BC117" : "#ED6300"}`}
                    p={1.5}
                    borderRadius="15px"
                  />
                </SliderTrack>
                <SliderThumb height={10} width={35} />
              </Slider>
            </Box>
          </StyleDiv>
          <StyleDiv className="flex flex-row flex-wrap mx-8 p-5">
            <TitleBorder>
              Payout
              <FieldBorder>{payout}</FieldBorder>
            </TitleBorder>

            <TitleBorder>
              Roll {`${isUnder ? "Under" : "Over"}`}
              <FieldBorder
                style={{ cursor: "pointer" }}
                onClick={() => setIsUnder(!isUnder)}
              >
                {sliderValue}
              </FieldBorder>
            </TitleBorder>

            <TitleBorder>
              Win chance
              <FieldBorder className="flex flex-row " style={{ width: "auto" }}>
                {winChance}%
                <BtnWinChance
                  className="ml-5"
                  onClick={() => setSliderValue(2)}
                >
                  Min
                </BtnWinChance>
                <BtnWinChance onClick={() => onSlideValue("minor")}>
                  -5
                </BtnWinChance>
                <BtnWinChance onClick={() => onSlideValue("plus")}>
                  +5
                </BtnWinChance>
                <BtnWinChance onClick={() => setSliderValue(99)}>
                  Max
                </BtnWinChance>
              </FieldBorder>
            </TitleBorder>
          </StyleDiv>
        </GridItem>
      </Grid>
    </Card>
  );
};

const StyleInput = styled(Input)({
  margin: "10px 0px",
});

const StyledSliderMark = styled(SliderMark)({
  marginTop: "25px",
  fontSize: "20px",
});

const StyleButton = styled(Button)({
  backgroundImage: "conic-gradient(from 1turn,#6ACF15,#209B44)",
  width: "100%",
  margin: "10px 0px",
  height: "60px",
  fontWeight: "bold",
});

const WinDiv = styled("div")({
  background: "#3BC117",
  padding: "10px 20px",
  margin: "0px 5px",
  width: "100px",
  fontWeight: "bold",
});

const LossDiv = styled("div")({
  background: "#31343C",
  padding: "10px 20px",
  margin: "0px 5px",
  width: "100px",
  fontWeight: "bold",
});

const BtnWinChance = styled(Button)({
  backgroundImage: "#31343C",
  borderRadius: "0px",
  marginRight: "1px",
});

const StyleDiv = styled("div")({
  background: "#222328",
  marginTop: "120px",
});

const DiceImg = styled("img")({
  width: "80px",
  height: "80px",
  "@media (max-width: 600px)": {
    width: "50px",
    height: "50px",
  },
});

const ResultDiv = styled("div")({
  border: "10px solid #222328",
  fontSize: "50px",
  fontWeight: "bolder",
  padding: "0px 10px",
  marginBottom: "20px",
  width: "170px",
  "@media (max-width: 600px)": {
    width: "70px",
    border: "5px solid #222328",
    fontSize: "20px",
    padding: "5px 5px",
  },
});

const TitleBorder = styled("div")({
  margin: "4px 12px",
});

const FieldBorder = styled("div")({
  background: "#2A2B32",
  padding: "4px 12px",
  width: "150px",
  height: "50px",
});

export default BasicDice;
