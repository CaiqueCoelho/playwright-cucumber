Feature: Ecommerce validations

    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 aplication with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username | password |
            | caiquedpfc@gmail.com  | $7DHhQP@PhiK8N11 |
            | caiquedpfc@gmail.com  | $7DHhQP@1212 |