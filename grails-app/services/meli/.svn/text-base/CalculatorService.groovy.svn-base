package meli

class CalculatorService {

boolean transactional = true

def calculate(BigDecimal amount, int quantity, BigDecimal interest) {
return (amount*interest / quantity).setScale(2,BigDecimal.ROUND_HALF_UP)
}
}