import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Switch, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addExpense, updateExpense } from '../services/api';

function ExpenseForm({ expense, onSubmit }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Other');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isRecurring, setIsRecurring] = useState(false);

    useEffect(() => {
        if (expense) {
            setAmount(expense.amount.toString());
            setDescription(expense.description);
            setCategory(expense.category);
            setDate(new Date(expense.date));
            setIsRecurring(expense.isRecurring);
        } else {
            setAmount('');
            setDescription('');
            setCategory('Other');
            setDate(new Date());
            setIsRecurring(false);
        }
    }, [expense]);

    const handleSubmit = async () => {
        const expenseData = {
            amount: parseFloat(amount),
            description,
            category,
            date: date.toISOString(),
            isRecurring,
        };

        try {
            if (expense && expense._id) {
                const updatedExpense = await updateExpense(expense._id, expenseData);
                onSubmit(updatedExpense);
            } else {
                const newExpense = await addExpense(expenseData);
                onSubmit(newExpense);
            }
        } catch (error) {
            console.error('Error submitting expense:', error);
            // TODO: Handle error (e.g., show an error message to the user)
        }
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Picker
                selectedValue={category}
                style={styles.input}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Transportation" value="Transportation" />
                <Picker.Item label="Entertainment" value="Entertainment" />
                <Picker.Item label="Utilities" value="Utilities" />
                <Picker.Item label="Shopping" value="Shopping" />
                <Picker.Item label="Other" value="Other" />
            </Picker>

            <View>
                <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}
            </View>

            <View style={styles.recurringContainer}>
                <Text>Recurring: </Text>
                <Switch value={isRecurring} onValueChange={setIsRecurring} />
            </View>

            <Button title={expense && expense._id ? "Update Expense" : "Add Expense"} onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    recurringContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
});

export default ExpenseForm;
