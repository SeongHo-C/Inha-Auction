## 2022 - Inha Auction Service
## 인하공전 학생을 위한 HTTP API를 이용한 중고거래 서비스 🚚
## Auction service using HTTP API for the Inha Technical College student
#### Project nickname : 인하공전 중고거래 서비스
#### Project execution period : 2022.04.14~2022.06.13
-----------------------
## Description
인하공전 중고거래 서비스는 당근마켓, 번개장터 등의 중고거래 시스템에 경매 시스템을 도입하여 구매하고자 하는 물품의 입찰에 참여할 수 있는 서비스입니다.

학과 강의 교재를 구매할 때 새 교재를 사기엔 금액적인 부담이 있어 선후배간 중고거래를 주로 이용합니다. 이 때 에브리타임이라는 앱의 장터 게시판을 이용할 수 있지만 학과별 분류가 없이 거래 글이 뒤섞여 있어 원하는 학과의 교재를 찾기가 번거로우며 거래가 끝난 상품인지 확인할 수 없다는 불편한 점이 있습니다. 그리하여 인하공전 학생들의 편의를 위한 인하공전 중고거래 서비스를 개발하기로 하였습니다.

## Environment

> JavaScript Version ES6+ (Window)
> 
> HTML5, CSS3
>
> Bootstrap5

## Main Function
### 경매

- 판매자가 등록한 시작가를 바탕으로 구매자가 입찰하거나 즉결 가격으로 즉시 낙찰 가능하다.
- 판매자의 선택에 따라서 낙찰자가 정해진다.(즉결 가격으로 입찰한 입찰자가 없는 경우)
- 경매 기간 동안 한 건의 입찰도 없는 경우 경매는 유찰되어 종료된다.

## System Structure

<img src="https://user-images.githubusercontent.com/83394485/176357995-d0cada2a-7d95-4383-b8ce-870dc6d0a0ad.png"/>

## Usecase Diagram

<img src="https://user-images.githubusercontent.com/83394485/176358971-067d5a40-3798-44ff-90e5-c90d2978744b.png" height="400" />

## Result(video)

https://www.youtube.com/watch?v=yvu-paQ6aYI
