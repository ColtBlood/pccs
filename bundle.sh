rm target/index-bundled.html
esbuild main.js --bundle --outfile=target/bundled.js

# Copy everything before <script type="module"> to target/index-bundled.html
awk '/<script type="module">/ {exit} {print}' index.html > target/index-bundled.html

# Add new <script> tag
echo '<script>' >> target/index-bundled.html

# Append bundled.js
cat target/bundled.js >> target/index-bundled.html

# Close script tag
echo '</script>' >> target/index-bundled.html

# Append everything after the original </script> tag from index.html
grep -A 10000 '</script>' index.html | tail -n +2 >> target/index-bundled.html

rm target/bundled.js