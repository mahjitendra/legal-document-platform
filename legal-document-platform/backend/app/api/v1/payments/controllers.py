from flask import request, jsonify, g
from app.services.payment_service import PaymentService
from app.schemas.payment_schema import payment_schema
from app.utils.decorators import token_required

@token_required
def create_payment_intent():
    data = request.get_json()
    amount = data.get('amount')
    document_id = data.get('document_id')  # Optional

    try:
        payment, client_secret = PaymentService.create_payment_intent(
            amount=amount,
            user_id=g.current_user.id,
            document_id=document_id
        )
        return jsonify({
            'clientSecret': client_secret,
            'paymentId': payment.id
        }), 201
    except ValueError as e:
        return jsonify({'message': str(e)}), 400
    except Exception as e:
        # In a real app, you would log the exception e
        return jsonify({'message': 'Could not create payment intent'}), 500