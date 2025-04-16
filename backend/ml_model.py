# ml_model.py

import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import MultiLabelBinarizer

def preprocess_data(user_expenses):
    """
    Preprocesses user expense data for the ML model.

    Args:
        user_expenses: A list of lists, where each inner list contains expense categories for a user.
                       Example: [['Food', 'Transportation'], ['Shopping', 'Entertainment', 'Food']]

    Returns:
        A tuple containing:
            - X: A NumPy array representing the binarized expense categories (features).
            - mlb: A MultiLabelBinarizer object used for encoding categories.
    """

    # Use MultiLabelBinarizer to convert lists of categories into a binary matrix
    mlb = MultiLabelBinarizer()
    X = mlb.fit_transform(user_expenses)  # Each column represents a category, 1 if present, 0 if not

    return X, mlb

def train_model(X, y):
    """
    Trains a basic Logistic Regression model.

    Args:
        X: Feature matrix (output from preprocess_data).
        y: Target variable (deal categories, in the same format as X after binarization).

    Returns:
        A trained Logistic Regression model.
    """

    # In a real scenario, y would be based on actual deal relevance for users
    # For this placeholder, we create a dummy y based on X (assuming some relationship)
    model = LogisticRegression(solver='liblinear', multi_class='auto')  # Simple classifier
    model.fit(X, np.argmax(X, axis=1)) # Trains the model

    return model

def predict_deal_categories(user_expense_categories, mlb=None, model=None):
    """
    Predicts deal categories based on user expense categories.

    Args:
        user_expense_categories: A list of expense categories for a user.
                                 Example: ['Food', 'Transportation', 'Other']
        mlb: (Optional) A trained MultiLabelBinarizer. If None, a new one is fit.
        model: (Optional) A trained ML model. If None, a placeholder is trained.

    Returns:
        A list of predicted deal categories.
    """

    # Preprocess the input data
    if mlb is None:
        X, mlb = preprocess_data([user_expense_categories])
    else:
        X = mlb.transform([user_expense_categories])

    # Train or use the provided model
    if model is None:
        # Create some dummy target data for training a placeholder
        num_categories = len(mlb.classes_)
        y = np.random.randint(0, 2, size=(1, num_categories))  # Placeholder target
        model = train_model(X, y)

    # Make predictions
    predicted_indices = model.predict(X)
    predicted_categories = mlb.inverse_transform(np.eye(len(mlb.classes_))[predicted_indices]) # Convert back to labels
    
    # Flatten the list of lists and return
    return list(predicted_categories[0])

if __name__ == '__main__':
    # Example usage:
    user_expenses = ['Food', 'Transportation', 'Shopping']
    predicted_deals = predict_deal_categories(user_expenses)
    print(f"For user expenses: {user_expenses}, predicted deals are: {predicted_deals}")

    # Example with pre-fitted encoder and model
    X, mlb = preprocess_data([['Food', 'Transportation'], ['Shopping', 'Entertainment']])
    model = train_model(X, np.argmax(X, axis=1))
    user_expenses2 = ['Entertainment', 'Other']
    predicted_deals2 = predict_deal_categories(user_expenses2, mlb=mlb, model=model)
    print(f"For user expenses: {user_expenses2}, predicted deals are: {predicted_deals2} (using pre-fitted model)")