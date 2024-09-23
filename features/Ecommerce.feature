Feature: Ecommerce validations

    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce aplication with "caiquedpfc@gmail.com" and "$7DHhQP@PhiK8N"
        When Add "ZARA COAT 3" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in the Order History page

    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 aplication with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username | password |
            | caiquedpfc@gmail.com  | $7DHhQP@PhiK8N11 |
            | caiquedpfc@gmail.com  | $7DHhQP@1212 |