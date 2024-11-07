package models

import "github.com/shopspring/decimal"

/*
Order 订单信息

- PayMethod：支付方式

- Amount：支付金额

- Status：支付状态

- UserID：所属用户

- TicketID：购买的车票
*/
type Order struct {
	ID        uint32          `gorm:"type:int unsigned;autoIncrement"`
	PayMethod string          `gorm:"type:enum('WeChatPay', 'Alipay');not null"`
	Amount    decimal.Decimal `gorm:"type:decimal(10,2);not null"`
	Status    string          `gorm:"type:enum('Paid','Unpaid');not null"`
	UserID    uint32          `gorm:"not null"`
	TicketID  uint32          `gorm:"not null"`
}
