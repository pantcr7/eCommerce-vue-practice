import frappe

@frappe.whitelist()
def place_order(products):
    if not products:
        frappe.throw("Please select products to order")
    
    user = frappe.session.user
    products = frappe.parse_json(products)  # Assuming products is a JSON string of list of products

    order = frappe.new_doc("Order")
    order.customer = user

    # Loop through each product and add it to the items child table
    for product in products:
        item = order.append("items", {})  # Append a new row to the 'items' child table
        item.product = product.get("product")  # Set the product link
        item.qty = product.get("qty")  # Set the quantity

    order.insert(ignore_permissions=True)
    return order