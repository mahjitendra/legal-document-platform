import json

def test_register(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/register' page is posted to (POST)
    THEN check that a '201' status code is returned and the message is correct
    """
    response = test_client.post('/api/v1/auth/register',
                                data=json.dumps(dict(username='testuser',
                                                     password='password123')),
                                content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['message'] == 'User registered successfully'

def test_register_duplicate_user(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/api/v1/auth/register' page is posted to with an existing username
    THEN check that a '400' status code is returned and the message is correct
    """
    # First, register a user
    test_client.post('/api/v1/auth/register',
                     data=json.dumps(dict(username='testuser',
                                          password='password123')),
                     content_type='application/json')
    # Then, try to register the same user again
    response = test_client.post('/api/v1/auth/register',
                                data=json.dumps(dict(username='testuser',
                                                     password='password123')),
                                content_type='application/json')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data['message'] == 'Username already exists'