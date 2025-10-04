from flask import request, jsonify, g
from app.models.payment import Payment
from app.schemas.payment_schema import payment_schema
from app.extensions import db
from app.utils.decorators import token_required

@token_required
def create_payment_intent():
    data = request.get_json()
    amount = data.get('amount')
    user_id = g.current_user.id

    if not amount:
        return jsonify({'message': 'Amount is required'}), 400

    # In a real application, you would integrate with a payment gateway like Stripe or Razorpay
    # and create a payment intent with them. Here, we'll just create a payment record in our database.
    new_payment = Payment(amount=amount, user_id=user_id)
    db.session.add(new_payment)
    db.session.commit()

    return jsonify({
        'clientSecret': f'mock_secret_{new_payment.id}', # This would be the client secret from the payment gateway
        'paymentId': new_payment.id
    }), 201