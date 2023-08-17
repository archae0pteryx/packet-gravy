import subprocess
import websockets
import asyncio
import json


async def handler(websocket, path):
    process = subprocess.Popen(
        ["tshark", "-i", "en0", "-c", "3", "-T", "ek"],
        stdout=subprocess.PIPE,
        bufsize=1,
        universal_newlines=True,
    )

    try:
        num_bad_lines = 0
        for line in iter(process.stdout.readline, ""):
            try:
                print(line)
                packet_dict = json.loads(line)
                
                # now we can filter out the payload (or any other fields)
                # if "ip" in packet_dict[0]["_source"]["layers"]:
                #     if "data" in packet_dict[0]["_source"]["layers"]["ip"]:
                #         packet_dict[0]["_source"]["layers"]["ip"].pop("data")
                # if "tcp" in packet_dict[0]["_source"]["layers"]:
                #     if "tcp.payload" in packet_dict[0]["_source"]["layers"]["tcp"]:
                #         packet_dict[0]["_source"]["layers"]["tcp"].pop(
                #             "tcp.payload"
                #         )  # noqa

                packet_json = json.dumps(packet_dict)
                await websocket.send(packet_json)
            except json.JSONDecodeError:
                print("Bad line")
                if num_bad_lines > 5:
                    raise

                num_bad_lines += 1

    except websockets.ConnectionClosed:
        print("Connection with client closed")

    finally:
        print("killing...")
        process.kill()


# Run the websocket server
start_server = websockets.serve(handler, "localhost", 8000)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

# import asyncio
# import websockets
# import subprocess
# from scapy.all import Ether
# import json

# SERVER = "localhost"
# PORT = 8000

# # import subprocess

# # def packetHandler(packet):
# #     # do your packet processing here
# #     print(packet.show2())

# # # start tcpdump
# # proc = subprocess.Popen(['tcpdump', '-i', 'eth0', '-s', '0', '-U', '-n', '-w', '-'], stdout=subprocess.PIPE)

# # # process packets in real-time
# # pkt = sniff(opened_socket=proc.stdout, prn=packetHandler)
# # tcpdump -i en0 -c 10 -vvv -e


# async def handler(websocket, path):
#     process = subprocess.Popen(
#         ["tcpdump", "-i", "en0", "-vvv", "-c", "3", "-w", "-", "-U"], stdout=subprocess.PIPE
#     )
#     try:
#         while True:
#             # read packet data from stdout
#             packet_data = process.stdout.readline()

#             # if we've hit EOF, terminate the loop
#             if packet_data == b"" and process.poll() is not None:
#                 break

#             # use Scapy to parse the packet data
#             packet = Ether(packet_data)

#             # serialize packet data in JSON format
#             packet_json = json.dumps(packet.fields)

#             # send the packet data
#             await websocket.send(packet_json)

#             # check if stop command is received
#             try:
#                 command = await asyncio.wait_for(websocket.recv(), timeout=1)
#                 if command == "stop":
#                     process.terminate()
#             except asyncio.TimeoutError:
#                 pass
#     except websockets.ConnectionClosed:
#         print("Connection with client closed")


# start_server = websockets.serve(handler, SERVER, PORT)
# print(f"opened socket {SERVER}:{PORT}")
# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()
